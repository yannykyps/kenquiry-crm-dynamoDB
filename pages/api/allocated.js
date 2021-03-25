import DynamoDB from "../../lib/dynamo";

export default async function handler(req, res) {

    if (req.method === "GET") {
        if (req.query.name) { 
          const items = await DynamoDB.scan({
            FilterExpression: "#status IN (:status) AND #allocated = :allocated",
            ExpressionAttributeNames: {
              "#status": "status",
              "#allocated": "allocated",
            },
            ExpressionAttributeValues: {
              ":status": "Allocated",
              ":allocated" : req.query.name,
            },
          });
          return res.status(200).json(items);
        } else {
        const items = await DynamoDB.scan({
            FilterExpression: "#status IN (:status)",
            ExpressionAttributeNames: {
              "#status": "status",
            },
            ExpressionAttributeValues: {
              ":status": "Allocated",
            },
          });
          return res.status(200).json(items); 
    }
}


}