import { prisma } from "@/lib/prisma";
import {
  ProjectType,
  BudgetRange,
  SubmissionStatus,
} from "@prisma/client";

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: ProjectType;
  budgetRange: BudgetRange;
  message: string;
}) {
  return prisma.contactSubmission.create({
    data: {
      ...data,
      status: "PENDING",
    },
  });
}

export async function getContactSubmissionsByStatus(status: SubmissionStatus) {
  return prisma.contactSubmission.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateContactSubmissionStatus(
  id: string,
  status: SubmissionStatus,
) {
  return prisma.contactSubmission.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}
