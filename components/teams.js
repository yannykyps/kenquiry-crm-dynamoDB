import Link from "next/link";
import members from "./teamMembers";
import useSWR from "swr";
import {TableHead, TableLayout} from "./table";
import Container from "./form/container";
import Splashscreen from "./splashscreen"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const {data, error} = useSWR(`/api/allocated`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <Splashscreen />;
  return (
    <Container>
      <TableLayout>
        <TableLayout.Head>
          <TableHead head="Name" />
          <TableHead head="Title" />
          <TableHead head="Status" />
          <TableHead head="Team" />
          <TableHead head="Workload" />
          <TableHead head="" styleClass="relative px-6 py-3" />
        </TableLayout.Head>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member, index) => {
            const count = data.Items.filter(
              (count) => count.allocated === member.name
            ).length;
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={member.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.role}</div>
                  <div className="text-sm text-gray-500">{member.duties}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {count !== 0 && (
                    <Link href={`/allocated?name=${member.name}`}>
                      <a className="text-indigo-600 hover:text-indigo-900">
                        Allocated
                      </a>
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableLayout>
    </Container>
  );
}
