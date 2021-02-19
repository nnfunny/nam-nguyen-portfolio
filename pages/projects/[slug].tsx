import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CatRainbow from "../../components/CatRainbow";
import Back from '../../components/Project/Back'
import ProjectDesc from "../../components/Project/ProjectDesc";
import projects, { Project } from "../../data/projects/projectInfo";
import styles from "../../styles/Project.module.scss";

export interface ProjectProp {
  project?: Project,
  error?: boolean
}

const ProjectItem: React.FC<ProjectProp> = ({ project, error }) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/personal/bee.svg" />
        <title>Projects | Nam Nguyen</title>
      </Head>

      {/* Main */}
      <div className={styles["project"]}>
        {loading ? (
          <div className="loader">
            <CatRainbow />
          </div>
        ) : (
          <section className="container">
            <Back/> 
            <ProjectDesc project={project} error={error}/>
          </section>
        )}
      </div>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project: Project) => ({
    params: {
      slug: project.params,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    const project = projects.find(
      (project: Project) => project.params === slug
    );
    return { props: { project } };
  } catch {
    return { props: { error: true } };
  }
};
export default ProjectItem;
