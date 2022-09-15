function StoryPage(text, image) {
   return (
      <div>
        {text}
        <img src={"data:image/png;base64," + image} /> 
        <br></br>
      </div>
 
    );
}

export default StoryPage;
