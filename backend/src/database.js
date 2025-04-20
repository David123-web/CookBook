const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { toJWT } = require("./auth/jwt");
const SALT_ROUNDS = 10;

// TODO: Implement these database operations
const dbOperations = {
  createUser: async (userData) => {
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, SALT_ROUNDS);
      console.log("User created:", userData);
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          profile: {
            create: {
              description: 'Add a description to stand out to employers...',
              imgUrl: 'https://www.modernmeal.com/assets/default-profile-avatar.png',
              hourlyRate: 0,
              yearsOfExperience: 0,
            },
          },
        },
        include: { profile: true },
      });
      console.log("User created:", user);
      delete user.password;
      return user;
      
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });
      if (!user) {
        return null;
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return null
      }
      delete user.password;
      const token = toJWT({ userId: user.id, userType: user.userType });
      return { token, ...user };
    } catch (error) {
      throw error;
    }
  },

  finduserbyEmail: async (email) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  findUserById: async (id) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },

  getBookingsByUserType: async (id, userType) => {
    try {
      if (userType === 'Chef') {
        return await prisma.booking.findMany({
          where: { profileId: parseInt(id) },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                businessName: true,
                email: true,
              },
            },
          },
        });
      } else {
        const bookings = await prisma.booking.findMany({
          where: { userId: parseInt(id) },
        });

        const results = [];
        for (const booking of bookings) {
          const chef = await prisma.user.findUnique({
            where: { id: booking.profileId },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              businessName: true,
              email: true,
            },
          });
          results.push({ ...booking, user: chef });
        }
        return results;
      }
    } catch (error) {
      throw error;
    }
  },

  updateBookingStatus: async (bookingId, bookingDate, userId) => {
    try {
      const bookingToUpdate = await prisma.booking.findUnique({
        where: { id: bookingId },
      });

      if (!bookingToUpdate) return null;

      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { accepted: !bookingToUpdate.accepted },
      });

      if (updatedBooking.accepted) {
        await prisma.availableDate.deleteMany({
          where: { profileId: userId, date: bookingDate },
        });
      }

      return updatedBooking;
    } catch (error) {
      throw error;
    }
  },


  deleteBooking: async (id) => {
    try {
      const bookingToDelete = await prisma.booking.findUnique({
        where: { id: parseInt(id) },
      });
      if (!bookingToDelete) {
        throw new Error("Booking not found");
      }
      return await prisma.booking.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw error;
    }
  },

  getAllTags: async () => {
    try {
      const tags = await prisma.specializationTag.findMany();
      return tags;
    } catch (error) {
      throw error;
    }
  },

  deleteUserTagById: async (userTagId) => {
    try {
      const deletedTag = await prisma.userTag.delete({
        where: { id: parseInt(userTagId) },
      });
      return deletedTag;
    } catch (error) {
      throw error;
    }
  },

  addUserTag: async (tagName, profileId) => {
    try {
      const existingTag = await prisma.specializationTag.findFirst({
        where: { tagName },
      });

      if (existingTag) {
        const newUserTag = await prisma.userTag.create({
          data: {
            profileId,
            specializationTagId: existingTag.id,
          },
        });
        return { newUserTag };
      } else {
        const newTag = await prisma.specializationTag.create({
          data: { tagName },
        });

        const newUserTag = await prisma.userTag.create({
          data: {
            profileId,
            specializationTagId: newTag.id,
          },
        });

        return { specialization: newTag, userTag: newUserTag };
      }
    } catch (error) {
      throw error;
    }
  },

  getAllChefsWithProfile: async () => {
    try {
      return await prisma.user.findMany({
        where: { userType: 'Chef' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          businessName: true,
          email: true,
          city: true,
          userType: true,
          profile: {
            include: {
              specializationTags: {
                include: { specializationTag: true },
              },
              reviews: true,
              availableDates: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getUserWithProfileById: async (id) => {
    try {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          businessName: true,
          email: true,
          city: true,
          userType: true,
          profile: {
            include: {
              specializationTags: {
                include: { specializationTag: true },
              },
              availableDates: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  updateUserAndProfile: async (userId, profileId, updates) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { city: updates.city },
      });

      const updatedProfile = await prisma.profile.update({
        where: { id: profileId },
        data: {
          yearsOfExperience: parseInt(updates.yearsOfExperience),
          hourlyRate: parseFloat(updates.hourlyRate),
          position: updates.position,
          description: updates.description,
        },
      });

      return { updatedUser, updatedProfile };
    } catch (error) {
      throw error;
    }
  },

  updateProfileImage: async (userId, imageUrl) => {
    try {
      const updatedProfile = await prisma.profile.update({
        where: { userId: parseInt(userId) },
        data: { imgUrl: imageUrl },
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  },

  getMessagesForUser: async (userId) => {
    try {
      return await prisma.message.findMany({
        where: { recipientUserId: userId },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          booking: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  sendMessageWithBooking: async (data) => {
    try {
      const message = await prisma.message.create({
        data: {
          userId: data.userId,
          title: data.title,
          content: data.content,
          recipientUserId: data.recipientUserId,
          date: data.date || null,
        },
      });

      if (data.date && !data.isReply) {
        await prisma.booking.create({
          data: {
            messageId: message.id,
            userId: data.userId,
            profileId: data.recipientUserId,
            accepted: false,
            date: data.date,
          },
        });
      }

      return message;
    } catch (error) {
      throw error;
    }
  },

  markMessageAsRead: async (messageId) => {
    try {
      const updatedMessage = await prisma.message.update({
        where: { id: messageId },
        data: { new: false },
      });
      return updatedMessage;
    } catch (error) {
      throw error;
    }
  },

  deleteMessage: async (messageId) => {
    try {
      return await prisma.message.delete({ where: { id: messageId } });
    } catch (error) {
      throw error;
    }
  },

  getProfileReviews: async (profileId) => {
    try {
      return await prisma.profileReview.findMany({
        where: { profileId },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, businessName: true },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  createProfileReview: async (profileId, reviewData) => {
    try {
      return await prisma.profileReview.create({
        data: {
          profileId,
          ...reviewData,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  addAvailableDate: async (profileId, date) => {
    try {
      return await prisma.availableDate.create({
        data: { profileId, date },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteAvailableDate: async (profileId, date) => {
    try {
      return await prisma.availableDate.deleteMany({
        where: { profileId, date },
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = {
  ...dbOperations,
};
