import DynamoDB from "../../lib/dynamo";

export default async function handler(req, res) {
   
  if (req.method === "GET") {
    const items = await DynamoDB.scan({
      TableName: "KenquiryAwsStack-Customers6955EA0A-45WJKUA9TU2Z",
    });
    return res.status(200).json(items);
  }

  if (req.method === "PUT") {
    const request = {
      id: req.body.id,
      fullName: req.body.fullname,
      email: req.body.email,
      telephone: req.body.tel,
      department: req.body.dept,
      address: req.body.address,
    };

    await DynamoDB.put({
      TableName: "KenquiryAwsStack-Customers6955EA0A-45WJKUA9TU2Z",
      Item: request,
    });

    res.status(201).json(request);
  }
}
