### Overview

A very simple FE app has been created to display team standup notes.

https://github.com/dcvezzani-church/team-standup-fe

Clone the repo and set up your local environment to run the Node Expres app

- node -v: v16.4.1
- npm -v: 8.8.0
- git clone https://github.com/dcvezzani-church/team-standup-fe.git
- npm i
- npm run start or npm run dev

Navigate to http://localhost:3000/team-standup?mock=true

You should see something like this.  If you don't please reach out to me if you need help resolving any issues.

![](images/efae3390-6328-4474-9fc7-4610193a7dd9-01.png)

When `mock=true` is included in the query parameters, content will be pulled from a [mock file](https://github.com/dcvezzani-church/team-standup-fe/blob/main/mock/standup.json).

The `/team-standup` endpoint is currently used to view the team standup notes for the most recent day and relies on a WS tier to provide a payload it can render.  While not a formal schema, please use [mock file](https://github.com/dcvezzani-church/team-standup-fe/blob/main/mock/standup.json) to provide an idea of the data contract the front end (FE) tier expects from the web service (WS) tier.

### Assignment

For your task, please write a node express server to handle requests from the FE.  The FE will make calls to http://localhost:3001/api/team/standup, so obviously the WS will need to provide an endpoint to handle that request.

- http://localhost:3001/api/team/standup

The WS should have access to the following sources.  Each represents a service, but for the purposes of this exercise, those sources are simply a JSON file.

- teamMembers: 'https://raw.githubusercontent.com/dcvezzani-church/team-standup-db/main/teamMembers.json',
- statusReportHistory: 'https://raw.githubusercontent.com/dcvezzani-church/team-standup-db/main/statusReportHistory.json',
- prayerHistory: 'https://raw.githubusercontent.com/dcvezzani-church/team-standup-db/main/prayerHistory.json',
- vacationPlans: 'https://raw.githubusercontent.com/dcvezzani-church/team-standup-db/main/vacationPlans.json'

#### teamMembers: an array of team members.  Each record in the array should have records that look like this.

Team Member
```
  {
    "id": 1,
    "name": "Darien Stanton",
    "description": "Ad laudantium ut. Laboriosam vel consequatur sit at voluptate natus. Et eius est blanditiis expedita est qui et dolores. Repellendus consequatur qui quia quia sed. Rerum aspernatur unde.",
    "email": "Jamaal81@hotmail.com",
    "phone": "1-616-360-1475 x325",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/345.jpg"
  },
```

#### statusReportHistory: array of Daily Status

Activity
```
{
  id: integer,
  description: string,
  scope: string (enum: [yesterday, today]),
  hoursWorked: integer,
}
```

Team Member Activity
```
{
  id: integer,
  teamMemberId: integer (ref: Team Member),
  activities[]: array of Activity
}
```

Daily Status
```
{
  id: integer,
  date: string,
  teamActivities[]: array of Team Member Activity
}
```

Example
```
[
  {
    "id": 1,
    "date": "2022-04-20",
    "teamActivities": [
      {
        "id": 1,
        "teamMemberId": 1,
        "activities": [
          {
            "id": 1,
            "description": "Accusamus et inventore sit soluta dolorem aperiam adipisci placeat est.",
            "scope": "yesterday",
            "hoursWorked": 1
          },
          {
            "id": 2,
            "description": "Culpa omnis voluptatum non aut beatae quasi nisi.",
            "scope": "today",
            "hoursEstimated": 1
          }
        ]
      },
      ...
  }
  ...
]
```

#### prayerHistory: array of who said prayers during standup

Prayer
```
  {
    "id": integer,
    "date": string (date when team member offered prayer),
    "teamMemberId": integer (ref: Team Member)
  },
```

#### vacationPlans: array of dates when associated team members will be out of the office

```
  {
    "id": integer,
    "date": string (date when team member plans to be out),
    "teamMemberId": integer (ref: Team Member)
  },
```


express --no-view team-standup-ws





