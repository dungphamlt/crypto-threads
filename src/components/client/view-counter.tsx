"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  postId: string;
  initialViews: number;
}

export default function ViewCounter({
  postId,
  initialViews,
}: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Gọi API để tăng view count
    const incrementView = async () => {
      try {
        // await fetch(`/api/posts/${postId}/view`, { method: 'POST' });
        // Giả sử chúng ta không có API để tăng view, nên chỉ hiển thị
        // Nếu có API, ta có thể cập nhật real-time views
      } catch (error) {
        console.error("Failed to increment view count:", error);
      }
    };

    incrementView();
  }, [postId]);

  return <span>{views} views</span>;
}
