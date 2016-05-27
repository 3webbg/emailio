# 3web <-> Emailio test task

## The idea

The purpose of this task is help both parties (Emailio and 3web) get used to one another. This in no way should be treated as a conventional skill "test". Any ideas / recommendations are **most welcome** and if needed, communication (via issues) *is encouraged*. The implementation of the concept mentioned below is not meant for production usage, however if there is interest, will and time - development can be continued and the code can be integrated into the main codebase (as a similar feature has been planed in the roadmap).

Note from `@krasiyan` - This task is not meant to take too much development time. Its initial estimate is between 3 and 4 hours, however this estimate is biased due to my familiarity with the Google APIs. If you estimate this to take more than the mentioned timeframe - please let me know so we can can cut it down (you can also suggest how to formulate it exactly).

## The task

Currently we have a concept called `autoswipes` (also known as `rules`). These are simple groups of conditions and actions which are evaluated on every new incoming email (if all the conditions are matched - the actions are executed). The main issue with this feature ATM is that its initial setup is very overwhelming for the new users. Thus we need to give them a head start recommending them several pre-populated autoswipes which they can choose whether to use. This will not only create a very personalized expirance but will also help showcase one of the main benefits of using Emailio over the conventional email client.

** Note: **
Our API server uses the [Gmail RESTful API](https://developers.google.com/gmail/api/) for all communication with Gmail. For the purpose of this test task we do not need to implement the full blown Gmail OAuth2 authentication, but rather need to feed the system directly with valid Gmail credentials (`access_token`, `client_id` and `client_secret`). [This simple script](https://github.com/krasiyan/gmail-authorizer) can be used to obtain them and a project in Google Developers Console [must be setup](https://developers.google.com/gmail/api/quickstart/nodejs). **The tool does not need to work for multiple users ATM**

In order to provide recommendations we must first analize the "behaviour" of our user in the past. *In this test scenario we will asume that the user does not use Gmail's threading feature.* This can happen with the following workflow, however any suggestions are most welcome.

1. Fetch a capped amount of the user's most recent messages (the amount can be set in a configuration file) from the Gmail API. **Only message metadata is needed here**
2. **Optional** Store the messages in a simple Mongoose collection. This can be skipped and the calculations can happen in memory.
3. Find all distinct sender addresses and for each one of them:

    1. Find the most common labels in the messages from the sender. A label can be considered as "common" if at least half the messages have it.
    2. Output to the console one line with the sender address and the most common labels found in their messages.

The output from this tool is esentially the recommendation for an autoswipe, where the sender's email address is the "condition" and the labels are the "actions".

**Example:**
The user has the following messages:
```
noreply@facebook.com   - ["TRASH"]
noreply@twitter.com    - ["INBOX", "STARRED"]
someone@work.com       - ["INBOX", "Work"]
someone@work.com       - ["INBOX", "Work", "STARRED"]
noreply@twitter.com    - ["INBOX", "STARRED"]
someone@work.com       - ["Work", "TRASH"]
someone@work.com       - ["Work", "STARRED"]
```

The exected console output from the tool is:
```
someone@work.com - ["Work", "INBOX", "STARRED"]
noreply@twitter.com - ["INBOX", "STARRED"]
noreply@facebook.com - ["TRASH"]
```

Of course the above logic can output labels like `["TRASH", "INBOX"]` for one sender, which are practically impossible to exist on a single message, however ATM we are absolutely ok with that.

## Tools of trade

For the purposes of this task NodeJS must be used (any version works). The following libraries must be used:

- https://github.com/google/google-api-nodejs-client
- Mocha. In Emailio we try to always do TDD. However with this task only 1-2 basic unit tests are needed. Integration tests on the Gmail API implementation are non needed.

The following libraries are good to have, but not required:

- Mongoose
- JSLint

## Helpful resources

- [Gmail RESTful API](https://developers.google.com/gmail/api/)
- [Gmail RESTful API NodeJS quickstart guide](https://developers.google.com/gmail/api/quickstart/nodejs)
- [Gmail API NodeJS wrapper lib](https://github.com/google/google-api-nodejs-client)
- [Endpoint for messages listing](https://developers.google.com/gmail/api/v1/reference/users/messages/list)
- [Endpoint for message fetching](https://developers.google.com/gmail/api/v1/reference/users/messages/get)
- [NodeJS mime parsing library](https://github.com/andris9/mimelib)