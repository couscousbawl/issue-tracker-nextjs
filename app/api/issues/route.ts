import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";


const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

/**
 * @swagger
 * components:
 *   schemas:
 *     issue:
 *       type: object
 *       required: title
 *       properties:
 *         title:
 *           type: string
 *           description: The issue title
 *         description:
 *           type: string
 *           description: The description of the issue
 *       example:
 *         title: The first issue
 *         description: description of the first issue
 */

 /**
  * @swagger
  * tags:
  *   name: Issue
  *   description: The issue managing API
  */

 /**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/issue'
 *     responses:
 *       200:
 *         description: The issue was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/issue'
 *       400:
 *         description: Some server error
 */

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });
    return NextResponse.json(newIssue, {status: 200});
}