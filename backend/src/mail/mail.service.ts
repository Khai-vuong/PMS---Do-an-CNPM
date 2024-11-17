import { Injectable, NotFoundException } from '@nestjs/common';
import { MailListDto } from 'DTOs/mail-list.dto';
import { PrismaService } from 'prisma/prisma.service';
import { paginate } from 'src/utils/pagination.util';

@Injectable()
export class MailService {
    constructor(private prisma : PrismaService) { };

    //----for user to get mail----
    async initMail(uid: string) {
        return this.MailPage("1", "5", uid);
    }   
    async getMail(page: string, pageSize: string, uid: string) {
        return this.MailPage(page, pageSize, uid);
    }



    //for mail
    async mail(sender: string, receiver: string, content: string) {
        const category = await this.extractCategory(content);
        if (!category) {
            return 'Invalid content';
        }
        await this.prisma.mail.create({
            data: {
                content: content,
                category: category,
                recipient: {
                    connect: { uid: receiver }
                },
                merge_request: {
                    connect: { mrid: "" }
                }
            }
        });
    }

    //for mail maker
    async mailMaker(category: string, sender: string) {
        this.prisma.mergeRequest
        let content = `<From ${sender}>\n`;
        switch (category) {
            case 'Authorization':
                content += 'Your authorization request has been processed.';
                break;
            case 'MergeRequest':
                content += 'Your merge request has been reviewed.';
                break;
            default:
                content += 'No specific content for this category.';
        }
        return content;
    }

    //for get category from mail content
    async extractCategory(content: string) {
        const match = content.match(/<From [^>]+>\n(Your authorization request has been processed\.|Your merge request has been reviewed\.)/);
        if (match) {
            if (match[1] === 'Your authorization request has been processed.') {
                return 'Authorization';
            } else if (match[1] === 'Your merge request has been reviewed.') {
                return 'MergeRequest';
            }
        }
        return null;
    }

    //for pagination
    async MailPage(page: string, pageSize: string, uid: string) {
        const listMails = await this.prisma.mail.findMany({
            where: {
                recipient: { uid: uid }
            }
        });
        if (!listMails) {
            throw new NotFoundException("No mail found");
        }
        const user = await this.prisma.user.findUnique({
            where: { uid: uid }
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        // Assuming listMails is an array of mail objects and each mail object has the properties: category, content, and created_at
        const mailsInfo: MailListDto[] = listMails.map(mail => {
        const { category, content, created_at } = mail;
                return { category, content, time: created_at } as MailListDto;
        }).filter((mail): mail is MailListDto => mail !== null); 



        const returnData = await paginate(mailsInfo, page, pageSize);


        return { username: user.username, mails: returnData.data };
    }
}
