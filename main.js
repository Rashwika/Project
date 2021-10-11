Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
Webcam.attach('#camera');

function capture_image() {
    Webcam.snap(function (cam_pic) {
        document.getElementById("captured_img").innerHTML = '<img id="image_pic" src="' + cam_pic + '"/>';

    });
}
console.log("ml5 version :", ml5.version);
model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LD27xuj7y/model.json", model_loaded);

function model_loaded() {
    console.log("Model Loaded Sucessfully");
}

function identify_image() {
    captured_img = document.getElementById("image_pic");
    model.classify(captured_img, get_array);
}

function get_array(error_status, result_array) {
    if (error_status) {
        console.error(error_status);
    } else {
        console.log(result_array);
        object_name = result_array[0].label;
        object_accuracy = (result_array[0].confidence * 100).toFixed(2);
        console.log(object_name, object_accuracy);
        if (object_accuracy < 70) {
            document.getElementById("obj_name").innerHTML = "Not sure, But looks like " + object_name;
            document.getElementById("obj_accuracy").innerHTML = object_accuracy + "%";
            speak();
        } else {
            document.getElementById("obj_name").innerHTML = object_name;
            document.getElementById("obj_accuracy").innerHTML = object_accuracy + "%";
        }

    }
}
function speak(){
    speak_data = "The accuracy is too low! Try taking picture with more clarity";
    speak_audio = new SpeechSynthesisUtterance(speak_data);
    window.speechSynthesis.speak(speak_audio);
}
window.addEventListener("keydown", capture_image);