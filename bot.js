const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor(conversationState) {
        super();
        this.conversationState = conversationState;

        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${context.activity.text}`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            await next();
        });
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context);
    }
}

module.exports.EchoBot = EchoBot;
