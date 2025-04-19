import React, { useState } from 'react';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';
import AvailabilityManager from '../components/AvailabilityManager';
import { useAddAvailability, useRemoveAvailability } from '../hooks/useAvailability';
import { useTags, useAddUserTag, useRemoveUserTag } from '../hooks/useUsers';
import { Button } from '../components/ui/button';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(moment());

  const addAvail = useAddAvailability();
  const removeAvail = useRemoveAvailability();
  const { data: allTags = [] } = useTags();
  const addTag = useAddUserTag();
  const removeTag = useRemoveUserTag();

  // Toggle an availability date
  const handleToggleDate = (day) => {
    const iso = day.format('YYYY-MM-DD');
    const exists = user.availability.some((d) => d.date === iso);
    if (exists) {
      removeAvail.mutate({ date: iso }, { onSuccess: () => refreshUser() });
    } else {
      addAvail.mutate({ date: iso }, { onSuccess: () => refreshUser() });
    }
  };

  // Add a new tag
  const handleAddTag = (e) => {
    const tagName = e.target.value;
    if (tagName) {
      addTag.mutate(
        { tagName, profileId: user.id },
        { onSuccess: () => refreshUser() }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Avatar & basic info */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <ImageUpload onSuccess={refreshUser} />
        <div>
          <h1 className="text-2xl font-bold">
            {user.name || user.email}
          </h1>
          {user.bio && (
            <p className="mt-2 text-gray-700">{user.bio}</p>
          )}
        </div>
      </div>

       {/* Availability manager */}
      <section>
        <AvailabilityManager
          initialDates={user.availability.map((d) => d.date)}
        />
      </section>

      {/* Tags */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Tags</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {user.tags.map((t) => (
            <div
              key={t.id}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1"
            >
              <span className="text-sm text-gray-800">{t.name}</span>
              <Button
                size="icon"
                variant="ghost"
                className="ml-1"
                onClick={() =>
                  removeTag.mutate(
                    { userTagId: t.id, userId: user.id },
                    { onSuccess: () => refreshUser() }
                  )
                }
              >
                ×
              </Button>
            </div>
          ))}
        </div>
        <select
          onChange={handleAddTag}
          className="rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
        >
          <option value="">Add a tag…</option>
          {allTags.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
}