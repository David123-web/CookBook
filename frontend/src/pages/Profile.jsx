import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';
import { useTags, useAddUserTag, useRemoveUserTag, useUpdateProfile } from '../hooks/useUsers';
import ImageUpload from '../components/ImageUpload';
import AvailabilityManager from '../components/AvailabilityManager';
import { Button } from '../components/ui/button';

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();
  const { data: allTags = [], isLoading: tagsLoading } = useTags();
  const addTag    = useAddUserTag();
  const removeTag = useRemoveUserTag();
  const updateProfile = useUpdateProfile();

  if (loading) return <p className="text-center py-12 text-gray-500">Loading your profile…</p>;
  if (!user)    return <Navigate to="/login" replace />;

  const profile = user.profile || {};

  // ---- state for editable fields ----
  const [city, setCity]                     = useState(user.city || '');
  const [yearsOfExperience, setYOE]         = useState(profile.yearsOfExperience || '');
  const [hourlyRate, setHourlyRate]         = useState(profile.hourlyRate || '');
  const [position, setPosition]             = useState(profile.position || '');
  const [description, setDescription]       = useState(profile.description || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile.mutate({
      userId: user.id,
      profileId: profile.id,
      city,
      yearsOfExperience,
      hourlyRate,
      position,
      description,
    },
      { onSuccess: () => {
        // Re‐fetch /me so AuthContext.user is up to date
        refreshUser();
        },
      }
    );
  };

  // tags
  const availDates = (profile.availableDates || []).map(d => d.date);
  const tags       = profile.specializationTags || [];

  const handleAddTag = (e) => {
    const tagName = e.target.value;
    if (tagName) {
      addTag.mutate({ tagName, profileId: profile.id }, { onSuccess: () => refreshUser() });
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Avatar & basic info */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <ImageUpload currentImage={profile.imgUrl} onUploadSuccess={() => refreshUser()} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="mt-2 text-gray-700">{description}</p>
        </div>
      </div>

      {/* Edit profile form */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialty</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYOE(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
            <input
              type="number"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio / Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary resize-none"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <Button type="submit" disabled={updateProfile.isLoading}>
              {updateProfile.isLoading ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
        {updateProfile.isError && (
          <p className="text-sm text-red-600">Error: {updateProfile.error.message}</p>
        )}
        {updateProfile.isSuccess && (
          <p className="text-sm text-green-600">Profile updated successfully!</p>
        )}
      </section>

      {/* Availability manager */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Manage Availability</h2>
        <AvailabilityManager initialDates={availDates} refreshUser={refreshUser} />
      </section>

    </div>
  );
}