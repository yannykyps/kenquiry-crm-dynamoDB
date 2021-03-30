import DynamoDB from "../../lib/dynamo";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const items = await DynamoDB.scan({
      TableName: "KenquiryAwsStack-Customers6955EA0A-45WJKUA9TU2Z",
    });
    return res.status(200).json(items);
  }
}
