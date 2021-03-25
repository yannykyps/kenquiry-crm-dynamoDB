import DynamoDB from "../../lib/dynamo";

export default async function handler(req, res) { 
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
                FilterExpression: "#status IN (:status)",
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
}