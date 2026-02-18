#define TRIG D5
#define ECHO D6
#define BUTTON D3

void setup() {
  Serial.begin(9600);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  digitalWrite(TRIG, LOW);
}

void loop() {
  if (digitalRead(BUTTON) == LOW) { // زرار مضغوط
    long duration;
    float distance;

    digitalWrite(TRIG, LOW);
    delayMicroseconds(2);

    digitalWrite(TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG, LOW);

    duration = pulseIn(ECHO, HIGH, 30000); // timeout 30ms

    if (duration > 0) {
      distance = duration * 0.034 / 2;
      Serial.print("Distance: ");
      Serial.print(distance);
      Serial.println(" cm");
    } else {
      Serial.println("No echo");
    }

    delay(500); // علشان مايعيدش بسرعة
  }
}
