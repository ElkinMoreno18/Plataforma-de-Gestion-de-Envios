import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import GuideInfoCard from "../organisms/GuideInfoCard";
import GuideInfoTimeline from "../organisms/GuideInfoTimeline";
import GuideInfoTabs from "../organisms/GuideInfoTabs";

interface GuideInfoPageProps {
  guideNumbers: any[]; 
}

const GuideInfoPage: React.FC<GuideInfoPageProps> = ({ guideNumbers }) => {
  console.log("guideNumbers en GuideInfoPage:", guideNumbers);
  const handleCopy = () => {
    console.log("Guía copiada");
  };

  return (
    <Box sx={{ padding: "24px", width: '100%' }}>
      {guideNumbers.length === 0 ? (
        <Typography variant="body2">No se han buscado guías.</Typography>
      ) : (
        guideNumbers.map((guideData, index) => (
          <React.Fragment key={index}>
            <GuideInfoCard onCopy={handleCopy} guideData={guideData} />
            <GuideInfoTimeline onCopy={handleCopy} guideData={guideData} />
            <GuideInfoTabs guideData={guideData}/>
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default memo(GuideInfoPage);  
