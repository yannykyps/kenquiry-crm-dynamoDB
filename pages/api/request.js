import DynamoDB from "../../lib/dynamo";

export default async function handler(req, res) {
  const dateToString = Date.now() + 3600 * 1000 * req.body.response;
  if (req.method === "PUT") {
    const request = {
      id: req.body.id,
      entryDate: Date.now(),
      fullName: req.body.fullname,
      email: req.body.email,
      telephone: req.body.tel,
      department: req.body.dept,
      address: req.body.address,
      priority: req.body.priority,
      team: req.body.team,
      response: req.body.response,
      status: req.body.status,
      jobType: req.body.jobType,
      job: req.body.job,
      dueBy: dateToString.toString(),
      updates: {},
    };

    await DynamoDB.put({
      Item: request,
    });

    res.status(201).json(request);
  }

  if (req.method === "GET") {
    if (req.query.id) {
      const {Item} = await DynamoDB.get({
        Key: {
          id: req.query.id,
          dueBy: req.query.dueBy,
        },
      });
      return res.status(200).json(Item);
    } else {
      const items = await DynamoDB.scan({
        FilterExpression: "NOT (#status IN (:status))",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": "Complete",
        },
      });
      return res.status(200).json(items);
    }
  }

  if (req.method === "POST") {
    const {Attributes} = await DynamoDB.update({
      Key: {
        id: req.body.id,
        dueBy: req.body.dueBy
      },
      UpdateExpression: "SET updates.comments = :comments, #state = :status, #p = :priority, #allocate = :allocated, updates.updatedBy = :updatedBy, updates.updatedDate = :updatedDate", 
      // ",
      ExpressionAttributeValues: {
        ":comments": req.body.comments,
        ":status": req.body.status,
        ":priority": req.body.priority,
        ":allocated": req.body.allocated,
        ":updatedBy": req.body.updatedBy,
        ":updatedDate": req.body.updatedDate,
      },
      ExpressionAttributeNames:{
        "#state": "status",
        "#p": "priority",
        "#allocate" : "allocated"
      },
      ReturnValues: "UPDATED_NEW",
    });

    res.status(200).json(Attributes);
  }

  if (req.method === "DELETE") {
    await DynamoDB.delete({
      Key: {
        id: req.query.id,
      },
    });

    res.status(204).json({});
  }
}
