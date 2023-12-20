export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MessageEvent = MessageNew | MessageSnapshot;

export type MessageNew = {
  __typename?: 'MessageNew';
  message: Scalars['String']['output'];
};

export type MessageSnapshot = {
  __typename?: 'MessageSnapshot';
  messages: Array<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  newMessage: Scalars['Boolean']['output'];
};


export type MutationNewMessageArgs = {
  message: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageEvents: MessageEvent;
};

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = { __typename?: 'Query', messages: Array<string> };

export type SubscribeMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeMessagesSubscription = { __typename?: 'Subscription', messageEvents: { __typename: 'MessageNew', message: string } | { __typename: 'MessageSnapshot', messages: Array<string> } };

export type NewMessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type NewMessageMutation = { __typename?: 'Mutation', newMessage: boolean };
