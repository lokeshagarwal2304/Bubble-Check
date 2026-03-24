'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export function TicketComments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Khan',
      avatar: 'SK',
      content:
        'Great! I found the issue in the header layout. It seems the CSS is conflicting with the mobile styles. Let me review the design files.',
      timestamp: 'Today, 02:45 PM',
    },
    {
      id: '2',
      author: 'Design file uploaded',
      avatar: '📎',
      content: 'Desktop updated, please review the latest design files in',
      timestamp: 'Today, 02:45 PM',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          author: 'You',
          avatar: 'YO',
          content: newComment,
          timestamp: 'Just now',
        },
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
      <h3 className="font-bold text-gray-900 mb-4">Comments</h3>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {comment.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900">{comment.author}</p>
                <p className="text-xs text-gray-500">{comment.timestamp}</p>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-500 mb-2">Write a comment</p>
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            rows={3}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none resize-none"
          />
          <Button
            onClick={handleAddComment}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
