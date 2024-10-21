import { Card, CardContent, Link, Typography } from "@mui/material";
import { Panel } from "../../../shared/models/panel";

interface Props{
  panel:Panel;
  id: string;
}

export const DashboardCard = ({panel, id}:Props) => {
  const { title, desc, link } = panel
  return (
    <Card className='w-96 p-4 h-48' variant='elevation' >
    <CardContent className='flex flex-col gap-4 items-center'>
      <Typography variant="h5">{title}</Typography>
      <Typography>{desc}</Typography>
      <Link href={`/${link}/${id}`} color='primary' variant='button' className='text-center mt-4'>Ver más</Link>
    </CardContent>
  </Card>
  )
}
