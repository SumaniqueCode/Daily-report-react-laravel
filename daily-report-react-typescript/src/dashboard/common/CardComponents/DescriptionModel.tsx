import { Card, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
interface DescriptionModel{
    title:string,
    description:string | null,
    closeDescriptionModel: ()=>void,
}
const DescriptionModel = ({title, description, closeDescriptionModel}:DescriptionModel) => {
  return (
    <Card sx={{position:"absolute", p: 2, m:2, borderRadius:3, width:2/7 , bgcolor:'white',top:"30%", left:"30%"}}>
      <CancelIcon onClick={()=>closeDescriptionModel()} sx={{ position:'absolute', right:'2%', top:'10%', ":hover&":{color:'red',}, fontSize:'30px' }}/>
        <Typography variant="subtitle1" sx={{fontWeight:'bold', color:'black' }}>{title}</Typography>
        <Typography variant="subtitle2" sx={{ mx:1 }}>{description}</Typography>
    </Card>
  )
}

export default DescriptionModel