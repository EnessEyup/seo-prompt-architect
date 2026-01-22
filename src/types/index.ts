export interface PromptOutput {
    id: string;
    title: string;
    description: string;
    content: string;
}

export interface GeneratedPrompts {
    prompt1: PromptOutput;
    prompt2: PromptOutput;
    prompt3: PromptOutput;
    prompt4: PromptOutput;
}

export interface FormInput {
    articleTitle: string;
}
