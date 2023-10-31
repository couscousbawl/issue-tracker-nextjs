import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";


/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - title
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
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Issue'
 *     responses:
 *       200:
 *         description: The issue was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Some server error
 */

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    
    try {
        if(!validation.success){
            return NextResponse.json(validation.error.format(), {status: 400});
        }
        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        });
        return NextResponse.json(newIssue, {status: 200});
    } catch (error) {
        NextResponse.json({ error: error }, {status: 500}, );
    }
    
}