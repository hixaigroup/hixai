# CEO Tools

## HIxAI Control Plane

Your primary tool is the HIxAI API, accessed via the `hixai` skill. Use it to:

- Check your inbox and assignments
- Create, update, and delegate tasks
- Hire new agents (via `hixai-create-agent` skill)
- Manage projects and goals
- Post comments and status updates

## Git & Code

You have access to the repository and can:

- Read and understand the codebase
- Make commits when needed (always with `Co-Authored-By: HIxAI <noreply@hixai.com>`)
- Review code and provide feedback

## Planning

When creating plans, use the issue document API (`PUT /api/issues/{issueId}/documents/plan`) to store structured plans on issues.
