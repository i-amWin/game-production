import { z } from 'zod';

// SCHEMAS
export const WalletSchema = z.object({
  id: z.number(),
  userId: z.number(),
  rechargeWallet: z.coerce.number(),
  winningWallet: z.coerce.number(),
  bonusWallet: z.coerce.number(),
});

export const RoleSchema = z.enum(['ADMIN', 'USER']);
export const ActiveStatus = z.enum(['ACTIVE', 'IN_ACTIVE']);
export const BlockStatus = z.enum(['BLOCKED', 'UN_BLOCKED']);

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  referralCode: z.string().nullable(),
  referredBy: z.number().nullable(),
  role: RoleSchema,
  activatedAt: z.string().nullable(),
  activeStatus: ActiveStatus,
  blockStatus: BlockStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
  wallet: WalletSchema.nullable(),
});

// TYPES
export type Wallet = z.infer<typeof WalletSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type ActiveStatus = z.infer<typeof ActiveStatus>;
export type BlockStatus = z.infer<typeof BlockStatus>;
export type User = z.infer<typeof UserSchema>;
