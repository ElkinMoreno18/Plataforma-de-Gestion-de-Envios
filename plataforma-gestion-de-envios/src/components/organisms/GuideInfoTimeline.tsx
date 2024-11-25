import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TimelineItem, TimelineSeparator, TimelineContent } from "@mui/lab";
import { Info } from "@mui/icons-material";
import { format } from "date-fns";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import coordinadoraIcon from "../../assets/icons/coordinadoraIcon.svg";
import packageIcon from "../../assets/icons/package.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface GuideInfoTimelineProps {
  guideData: any;
  onCopy: () => void;
}

const GuideInfoTimeline: React.FC<GuideInfoTimelineProps> = React.memo(({ guideData, onCopy }) => {
  const { data } = guideData;
  const [timelineData, setTimelineData] = useState<any[]>([]);

  const iconMap: { [key: string]: React.ReactElement } = {
    "1": <img src={packageIcon} alt="Icono Paquete" style={{ width: "34px" }} />,
    "3": <WarehouseOutlinedIcon />,
    "5": <img src={coordinadoraIcon} alt="Icono Delivery" style={{ width: "34px" }} />,
  };

  const formatDate = (date: string, time: string | null) => {
    const formattedDate = new Date(date + " " + (time || "00:00:00"));
    return format(formattedDate, "yyyy/MM/dd hh:mm a");
  };

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await fetch(
        "https://api.coordinadora.com/cm-tracking-consulta-test/api/v1/remisiones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guias: [data?.guia],
          }),
        }
      );
      const result = await response.json();
      if (!result.isError) {
        setTimelineData(result.data[0]?.estado || []);
      }
    };

    fetchTrackingData();
  }, [data?.guia]);

  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Box >
        <Slider {...sliderSettings}>
          {timelineData.slice(0, 5).map((event, index) => {
            const isLast = index === timelineData.length - 1;
            return (
              <TimelineItem
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <TimelineSeparator
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {index > 0 && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#003C82",
                        position: "absolute",
                        left: "-50px",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      backgroundColor: isLast ? "#003C82" : "#E1EDFB",
                      color: isLast ? "white" : "#003C82",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    {iconMap[event.codigo] || <Info />}
                  </Box>
                  {!isLast && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#003C82",
                        position: "absolute",
                        right: "-50px",
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: isLast ? "#003C82" : "#E1EDFB",
                      borderRadius: "50%",
                      margin: "8px auto",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#00000099", textAlign: "center" }}
                  >
                    {formatDate(event.fecha, event.hora)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {event.descripcion}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
});

export default GuideInfoTimeline;
