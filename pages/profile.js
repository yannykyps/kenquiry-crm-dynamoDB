import React, {useEffect, useState} from "react";
import {
    Layout,
    SEO,
    Title,
    Profile,
    Splashscreen
  } from "../components";
import Members from "../components/data/teamMembers"
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProfilePage () {
    const {data, error} = useSWR(`/api/allocated`, fetcher);
    const profile = Members.find(name => name.name === "Jo")
    const [count, setCount] = useState()
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        if (data) {
            setCount(data.Items.filter(count => count.allocated === "Jo").length)
            setLoading(false)
        }
    },[data])

    return (
        <Layout>
        <SEO title="profile" />
        <Title title={`${profile.name}'s profile`} subTitle="Manage your own profile" />
        {loading ? <Splashscreen /> : 
         <Profile image={profile.image} name={profile.name} role={profile.role} email={profile.email} team={profile.team} duties={profile.duties} allocated={count}/>}   
        </Layout>
    )
}
