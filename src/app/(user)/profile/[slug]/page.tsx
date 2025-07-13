"use client";
import { sendRequest } from "@/utils/api";
import CardMusicPf from "../../../../components/cardmusic/cardMusicPf";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const current = 1;
  const pageSize = 1000; // Tăng số lượng để lấy tất cả

  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop[]>>>({
    url: `http://localhost:8000/api/v1/tracks/users?current=${current}&pageSize=${pageSize}`,
    method: "POST",
    body: { id: slug },
  });

  //@ts-ignore
  const data = tracks?.data?.result || [];

  return (
    <Container sx={{ my: 5 }}>
      <div style={{ height: "80vh", overflowY: "auto", paddingRight: 8 }}>
        <Grid container spacing={2} alignItems="stretch">
          {data.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <CardMusicPf data={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ProfilePage;
