import { api } from "@/lib/request";

export interface Game {
  id: number;
  name: string;
  author: string;
  pub_time: string;
  price: number;
}

export interface GameListResponse {
  list: Game[];
  total: number;
}

export interface GameStats {
  total_games: number;
  total_authors: number;
}

export interface GameQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  author?: string;
}

// 获取游戏列表
export const getGameList = (params?: GameQueryParams) => {
  return api.get<GameListResponse>("/games/", { params });
};

// 获取游戏详情
export const getGameDetail = (id: number) => {
  return api.get<Game>(`/games/${id}/`);
};

// 创建游戏
export const createGame = (data: Omit<Game, "id" | "pub_time">) => {
  return api.post<Game>("/games/", data);
};

// 更新游戏
export const updateGame = (id: number, data: Partial<Omit<Game, "id" | "pub_time">>) => {
  return api.put<Game>(`/games/${id}/`, data);
};

// 删除游戏
export const deleteGame = (id: number) => {
  return api.delete(`/games/${id}/`);
};

// 获取统计信息
export const getGameStats = () => {
  return api.get<GameStats>("/stats/");
};
