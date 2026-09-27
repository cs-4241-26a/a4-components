import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.use(express.json());

let nextId = 2;

const appdata = [
  {
    id: 1,
    company: "WPI",
    role: "Researcher",
    dateApplied: "2023-01-01",
    resume: "resume.pdf",
    status: "applied"
  }
];


const calcApplicationAge = function(dateApplied) {
  const oneDay = 1000*60*60*24;

  const appliedDate = new Date(dateApplied + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today - appliedDate;

  const diffDays =
    Math.floor(diffTime / oneDay);

  if (diffTime < 0) {
    return "Invalid date";
  } else if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weekCount =
      Math.floor(diffDays / 7);

    if (weekCount === 1) {
      return "1 week ago";
    }

    return `${weekCount} weeks ago`;

  } else if (diffDays < 365) {
    const monthCount =
      Math.floor(diffDays / 30);

    if (monthCount === 1) {
      return "1 month ago";
    }
    return `${monthCount} months ago`;
  } else {

    const yearCount =
      Math.floor(diffDays / 365);

    if (yearCount === 1) {
      return "1 year ago";
    }

    return `${yearCount} years ago`;
  }
};

app.get("/api/applications", function(request, response) {
  appdata.forEach(function(application) {
    application.applicationAge =
      calcApplicationAge(application.dateApplied);

  });

  response.json(appdata);
});




app.post("/submit", function(request, response) {

  const newApplication = request.body;
  newApplication.id = nextId;
  nextId++;

  newApplication.applicationAge =
    calcApplicationAge(newApplication.dateApplied);

  appdata.push(newApplication);

  response.json(appdata);
});


app.delete("/api/applications", function(request, response) {
  const id = request.body.id;
  const index = appdata.findIndex(function(application) {
    return application.id === id;
  });

  if (index !== -1) {
    appdata.splice(index, 1);
  }

  response.json(appdata);
});



app.put("/api/applications", function(request, response) {
  const id = request.body.id;
  const status = request.body.status;
  const application = appdata.find(function(application) {
    return application.id === id;
  });

  if (application) {
    application.status = status;
  }

  response.json(appdata);
});


ViteExpress.listen(app, 3000, function() {
  console.log(
    "Server is listening on port 3000..."
  );

});