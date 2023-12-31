package com.ssafy.completionism.domain.transaction;

import lombok.Builder;
import lombok.Getter;

@Getter
public enum Feel {

    DESIRE("너무 좋음"),
    GRATITUDE("감사"),    JOY("신남"),
    ANGER("화남"),
    DISGUST("역겨움"),
    FEAR("공포"),
    GRIEF("약간 슬픔"),
    CURIOSITY("호기심"),
    SURPRISE("놀람"),
    NEUTRAL("그저 그런 감정"),
    HAPPY("행복"),
    SAD("슬픔");

    private final String text;

    Feel(String text) {
        this.text = text;
    }

    public static Feel fromText(String text) {
        for (Feel feel : Feel.values()) {
            if (feel.getText().equals(text)) {
                return feel;
            }
        }
        throw new IllegalArgumentException("Invalid text: " + text);
    }

    public String getText() {
        return text;
    }


}
