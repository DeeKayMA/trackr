// Analytics page on the dashboard
import Header from "../../../components/Header/Header";

export default function Analytics() {
    return (
       <div className="flex flex-col w-full">
          <Header title="Analytics" />

          {/* TOP PRIORITY DATA */}

          {/* Four stat cards, showing real-time counts: */}
          <div>
            <div>Total Applications</div>
            <div>Interviews</div>
            <div>Offers</div>
            <div>Rejections</div>
          </div>
          {/* 2 column grids */}
   
          <div>Application Status Breakdown</div>
          <div>Application to Offer Rate</div>
          <div>Interview to Offer Rate</div>

          <div>Applications submitted over time, weekly,monthly</div>
          <div>Days since last application</div>


          {/* MEDIUM PRIORITY DATA  + behind show more */}

          <div>Application to Interview Rate</div>
          <div>Top companies</div>
          <div>Top Job Titles</div>
          <div>Average Salary</div>

          <div>Applications by Job Type</div>
          <div>Applications by Work Type</div>
          <div>Applications by Locations</div>
          

        

        </div>
    );
}