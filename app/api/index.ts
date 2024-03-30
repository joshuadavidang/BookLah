import { fetcher } from "@/api/helper";
import { type UserInfo } from "@/utils/userInfo";
import useSWR from "swr";

export const useUserInfo = () => {
  const userDataAPI = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${process.env.NEXT_PUBLIC_USER_DATA}`;
  const { data, error, isLoading } = useSWR<UserInfo>(userDataAPI, fetcher);
  return { data, error, isLoading };
};

export const useConcertDetails = () => {
  const concertDetailsAPI = String(process.env.NEXT_PUBLIC_GET_CONCERTS);
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useConcertDetail = (concert_id: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_GET_CONCERT + `/${concert_id}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useAdminCreatedConcert = (userId: string) => {
  const concertDetailsAPI =
    process.env.NEXT_PUBLIC_ADMIN_CREATED_CONCERT + `/${userId}` || "";
  const { data, error, isLoading } = useSWR(concertDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useForumDetails = () => {
  const forumDetailsAPI = String(process.env.NEXT_PUBLIC_GET_FORUMS);
  const { data, error, isLoading } = useSWR(forumDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useForumDetailUserId = (user_id: string) => {
  const forumDetailAPI =
    process.env.NEXT_PUBLIC_GET_FORUM_BY_USER_ID + `/${user_id}` || "";
  const { data, error, isLoading } = useSWR(forumDetailAPI, fetcher);
  return { data, error, isLoading };
};

export const useForumDetailConcertId = (concert_id: string) => {
  const forumDetailAPI =
    process.env.NEXT_PUBLIC_GET_FORUM_BY_CONCERT_ID + `/${concert_id}` || "";
  const { data, error, isLoading } = useSWR(forumDetailAPI, fetcher);
  return { data, error, isLoading };
};

export const usePostDetails = (concert_id: string) => {
  const postDetailsAPI = String(
    process.env.NEXT_PUBLIC_GET_POSTS_BY_CONCERT_ID + `/${concert_id}` || ""
  );
  const { data, error, isLoading } = useSWR(postDetailsAPI, fetcher);
  return { data, error, isLoading };
};

export const useCommentDetail = (post_id: string) => {
  const commentDetailAPI =
    process.env.NEXT_PUBLIC_GET_COMMENT + `/${post_id}` || "";
  const { data, error, isLoading } = useSWR(commentDetailAPI, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
};

export const useBookings = (user_id: string) => {
  const bookingsAPI =
    process.env.NEXT_PUBLIC_GET_BOOKINGS + `/${user_id}` || "";
  const { data, error, isLoading } = useSWR(bookingsAPI, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading };
};
