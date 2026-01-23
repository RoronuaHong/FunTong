from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import GameModel, TagModel
from .serializers import GameSerializer, TagSerializer


class StandardResultPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class GameViewSet(viewsets.ModelViewSet):
    """
    游戏管理 ViewSet
    提供游戏的增删改查功能
    """
    queryset = GameModel.objects.all()
    serializer_class = GameSerializer
    pagination_class = StandardResultPagination

    def get_queryset(self):
        queryset = GameModel.objects.all()

        # 搜索功能
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(author__icontains=search)
            )

        # 作者筛选
        author = self.request.query_params.get('author', None)
        if author:
            queryset = queryset.filter(author=author)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return Response({
                'code': 0,
                'message': 'success',
                'data': {
                    'list': serializer.data,
                    'total': queryset.count(),
                }
            })

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'code': 0,
            'message': 'success',
            'data': {
                'list': serializer.data,
                'total': queryset.count(),
            }
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({
                'code': 0,
                'message': '创建成功',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'code': 1,
            'message': '创建失败',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'code': 0,
            'message': 'success',
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                'code': 0,
                'message': '更新成功',
                'data': serializer.data
            })
        return Response({
            'code': 1,
            'message': '更新失败',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'code': 0,
            'message': '删除成功',
            'data': None
        }, status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    """
    标签管理 ViewSet
    """
    queryset = TagModel.objects.all()
    serializer_class = TagSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'code': 0,
            'message': 'success',
            'data': serializer.data
        })


@api_view(['GET'])
def game_stats(request):
    """
    游戏统计信息
    """
    total_games = GameModel.objects.count()
    authors = GameModel.objects.values('author').distinct().count()

    return Response({
        'code': 0,
        'message': 'success',
        'data': {
            'total_games': total_games,
            'total_authors': authors,
        }
    })
