import { useEffect, useState } from 'react';
import { getNotifications, type NotificationRecord } from '../services/notification.service';

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationRecord[]>([]);

  useEffect(() => {
    void (async () => {
      const notifications = await getNotifications();
      setItems(notifications);
    })();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
      <h2 className="text-xl font-semibold text-white">Notifications</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No notifications yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-300">
              <p className="font-medium text-white">{item.type}</p>
              <p>{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
