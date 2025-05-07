interface AboutTextProps {
    description: string
  }
  
  const AboutText = ({ description }: AboutTextProps) => {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    )
  }
  
  export default AboutText
  