import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';

import { prisma } from '@/db';

const getNameByInviteCodeQuerySchema = z.object({
  inviteCode: z.string({
    message: 'Invite code must be a string and not empty',
  }),
});

export const getNameByInviteCode = catchAsyncError(async (req, res) => {
  const { inviteCode } = getNameByInviteCodeQuerySchema.parse(req.query);

  const user = await prisma.user.findUnique({
    where: {
      referralCode: inviteCode,
    },
    select: {
      name: true,
    },
  });

  if (!user) {
    throw new CustomError(400, 'Invalid invite code');
  }

  res.json({
    success: true,
    message: 'User name fetched successfully',
    data: user,
  });
});
