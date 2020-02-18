commit message format
----------------------------
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on github as well as in various git tools.

### Subject line        
Subject line contains succinct description of the change.

#### Allowed `<type>`
* feat (feature)
* fix (bug fix)
* docs (documentation)
* style (formatting, missing semi colons, …)
* refactor
* test (when adding missing tests)
* chore (maintain)

#### Allowed `<scope>`
Scope could be anything specifying place of the commit change. Example <scope> values:
- reviews
- rating
- notification
- dashboard
- authentication
- etc.

The <scope> can be empty (eg. if the change is a global or difficult to assign to a single component), in which case the parentheses are omitted.

#### `<subject>` text
* use imperative, present tense: “change” not “changed” nor “changes”
* don't capitalize first letter
* no dot (.) at the end

### Message body (optional)
* just as in <subject> use imperative, present tense: “change” not “changed” nor “changes”
* includes motivation for the change and contrasts with previous behavior

http://365git.tumblr.com/post/3308646748/writing-git-commit-messages
http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

### Message footer (optional)

#### Referencing issues

Closed bugs should be listed on a separate line in the footer prefixed with "Closes" keyword like this:
```
Closes #234
```

or in case of multiple issues:
```
Closes #123, #245, #992
```
### Sample commit message

```
fix(footer): align social media buttons

Space the social media buttons in the footer evenly.
When a user is on any page, he/she should see social media buttons in the footer displayed properly.

closes #12345
```

Branch-Naming Convention
----------------------------

```
{story type}-{2-3 word summary}
```

`story-type` - Indicates the context of the branch and should be one of:

- ft == Feature
- bg == Bug
- ch == Chore

`story-summary` - Short 2-3 words summary about what the branch contains

**Example**

```
ft-resources-rest-endpoints-111504508
```