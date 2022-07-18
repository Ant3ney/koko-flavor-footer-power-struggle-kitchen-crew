import mStats from "../ManageStats/ManageStats";
import Dialog from "../Conversation/Dialog";
let staticConversation = {};

var ConversationTempletes = [
    (dialogChanged, exit) => {
        var subJect01Obj = mStats.getRandomCharacter(true);
        var subject01 = subJect01Obj.name.getFirst();
    
        return({
            conversation01: [
                {
                    dialog: new Dialog(subJect01Obj, "Keep onversation on track"),
                    responses: [
                        {
                            title: "Yes",
                            onPress: () => {
                                staticConversation.index++;
                                dialogChanged();
                            }
                        },
                        {
                            title: "No",
                            onPress: () => {
                                staticConversation.index = 0;
                                staticConversation.currentConversation = staticConversation.currentTemplete.conversation02;
                                dialogChanged();
                            }
                        }
                    ]
                },
                {
                    dialog: new Dialog(subJect01Obj, "Seceond pice of ontrack dialog"),
                    responses: [
                        {
                            title: "Next",
                            onPress: () => {
                                staticConversation.index++;
                                dialogChanged();
                            }
                        }
                    ]
                },
                {
                    dialog: new Dialog(subJect01Obj, "Third pice of ontrack dialog"),
                    responses: [
                        {
                            title: "Next",
                            onPress: () => {
                                staticConversation.index++;
                                dialogChanged();
                            }
                        }
                    ]
                },
                {
                    dialog: new Dialog(subJect01Obj, "Fourth pice of ontrack dialog"),
                    responses: [
                        {
                            title: "Next",
                            onPress: () => {
                                staticConversation.endConversationProcedure(dialogChanged, exit);
                            }
                        }
                    ]
                }
            ],
            conversation02: [
                {
                    dialog: new Dialog(subJect01Obj, "Would you like to return things to normal?"),
                    responses: [
                        {
                            title: "Yes",
                            onPress: () => {
                                staticConversation.index = 1;
                                staticConversation.currentConversation = staticConversation.currentTemplete.conversation01;
                                dialogChanged();
                            }
                        },
                        {
                            title: "No",
                            onPress: () => {
                                staticConversation.index++;
                                dialogChanged();
                            }
                        }
                    ],
                },
                {
                    dialog: new Dialog(subJect01Obj, "The next dialog will bring you back"),
                    responses: [
                        {
                            title: "Next",
                            onPress: () => {
                                staticConversation.index = 1;
                                staticConversation.currentConversation = staticConversation.currentTemplete.conversation01;
                                dialogChanged();
                            }
                        }
                    ],
                }
            ]
        });
    }
];

export default ConversationTempletes