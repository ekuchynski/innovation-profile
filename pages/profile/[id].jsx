import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Alert, Card, Col, Empty, Row, Spin, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/dashboard/Dashboard'

function PublicProfilePage(props)
{
   const supabase = useSupabaseClient();
   const router = useRouter();

   const [profile, setProfile] = useState();
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() =>
   {
      loadData();
   }, [router.isReady])

   async function loadData()
   {
      setLoading(true);
      const { data, error } = await supabase.from('profile').select('*, project_template(*), project(*), domain(*)').eq('tenantId', router.query.id).maybeSingle();
      setLoading(false);
      if (error || !data)
      {
         let err = 'Profile with provided ID has not been found.';
         if (error?.message)
            err += ` Error message: ${error.message}`;
         setError(err);
         return;
      }
      setProfile(data);
   }

   if (!profile)
   {
      if (loading)
         return <Spin />
      return <Empty>
         {error && <Alert type='error' message={error} />}
      </Empty>
   }
   return (
      <Spin spinning={loading}>
         <Dashboard profile={profile} />
      </Spin>
   )
}

export default PublicProfilePage