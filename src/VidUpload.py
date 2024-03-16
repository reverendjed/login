from roboflow import Roboflow

rf = Roboflow(api_key="hrHXV6QIsOWhUf9XSJ5F")
project = rf.workspace().project("brown-trout-counter")
model = project.version("2").model

job_id, signed_url, expire_time = model.predict_video(
    "video1.mp4",
    fps=5,
    prediction_type="batch-video",
)

results = model.poll_until_video_results(job_id)

print(results)