import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';
import AvailabilityManager from '../components/AvailabilityManager';
import { useTags, useAddUserTag, useRemoveUserTag } from '../hooks/useUsers';
import { Button } from '../components/ui/button';

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();

  // Fetch all available tags
  const {
    data: allTags = [],
    isLoading: tagsLoading,
    isError: tagsError,
    error: tagsErrorObj,
  } = useTags();

  const addTag    = useAddUserTag();
  const removeTag = useRemoveUserTag();

  if (loading) {
    return (
      <p className="text-center py-12 text-gray-500">
        Loading your profile…
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Pull nested profile data
  const profile = user.profile || {};
  const availDates = (profile.availableDates || []).map(d => d.date);
  const tags       = profile.specializationTags || [];
  const avatarUrl  = profile.imgUrl;
  const bio        = profile.description;

  // Handlers
  const handleAddTag = (e) => {
    const tagName = e.target.value;
    if (tagName) {
      addTag.mutate(
        { tagName, profileId: profile.id },
        { onSuccess: () => refreshUser() }
      );
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Avatar & basic info */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <ImageUpload
          currentImage={avatarUrl}
          onUploadSuccess={() => refreshUser()}
        />
        <div>
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          {bio && <p className="mt-2 text-gray-700">{bio}</p>}
        </div>
      </div>

      {/* Availability manager */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Manage Availability</h2>
        <AvailabilityManager initialDates={availDates} />
      </section>

      {/* Tags */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Tags</h2>

        {/* Existing tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
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

        {/* Add new tag */}
        {tagsLoading && <p className="text-gray-500">Loading tags…</p>}
        {tagsError && (
          <p className="text-red-600">Error: {tagsErrorObj.message}</p>
        )}
        <select
          onChange={handleAddTag}
          defaultValue=""
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