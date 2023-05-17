import { useApi } from '@backstage/core-plugin-api';
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef, Topic } from '../../api/types';
import {
  Typography,
} from '@material-ui/core';
import { InfoCard, Progress } from '@backstage/core-components';

type TopicStatsContentProps = {
  topic: Topic;
};

export const TopicStatsContent = ({ topic }: TopicStatsContentProps ) => {
  const pulsarApi = useApi(pulsarApiRef);

  const {
    value: stats,
    loading,
    error,
  } = useAsync(async () => {
    return await pulsarApi.getTopicStats(
      topic.tenant,
      topic.namespace,
      topic.name,
    );
  }, []);

  return (
    <>
      {loading && <Progress />}

      {!error && !loading && stats !== undefined && (
        <>
          <InfoCard>
            <Typography variant="h5">Throughput</Typography>
            <Typography>
              Ingress: {Math.round(stats.msgRateIn)} msg/s
            </Typography>
            <Typography>
              Egress: {Math.round(stats.msgRateOut)} msg/s
            </Typography>
          </InfoCard>
        </>
      )}
    </>
  );
};

// <Box>
//   <Grid container spacing={2}>
//     <Grid item xs={6}>
//       <Paper>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Producer</TableCell>
//               <TableCell>msg/s</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stats.publishers.map((p, index) => (
//               <TableRow key={index}>
//                 <TableCell>{p.producerName}</TableCell>
//                 <TableCell>{p.msgRateIn.toFixed(3)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Grid>
//     <Grid item xs={6}>
//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Consumer</TableCell>
//               <TableCell>msg/s</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(stats.subscriptions).map(
//               ([subName, subContent]) => {
//                 return (
//                   <TableRow key={subName}>
//                     <TableCell>{subName}</TableCell>
//                     <TableCell>{subContent.messageAckRate}</TableCell>
//                   </TableRow>
//                 );
//               },
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Grid>
//   </Grid>
// </Box>
