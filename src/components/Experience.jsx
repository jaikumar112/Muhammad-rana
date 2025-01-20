import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Required styles for the timeline
import { FaBriefcase, FaLaptopCode } from "react-icons/fa"; // Example icons
import SectionHeading from "./SectionHeading";

export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;

  return (
    <section className="section gray-bg">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />

        <VerticalTimeline>
          {allExperience?.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "#f4f4f4",
                color: "#333",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid #f4f4f4",
              }}
              date={item.duration}
              iconStyle={{
                background: "#6c63ff",
                color: "#fff",
              }}
              icon={index % 2 === 0 ? <FaBriefcase /> : <FaLaptopCode />}
            >
              <h4 className="vertical-timeline-element-title">
                {item.designation}
              </h4>
              <h5 className="vertical-timeline-element-subtitle">
                {item.company}
              </h5>
              <p className="vertical-timeline-element-description">
                {item.companyDescription}
              </p>
              <p className="timeline-jobType">{item.jobType}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
