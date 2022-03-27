package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.TypeOfResponse;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Component;

import java.util.EnumMap;

@Log4j2
@Component
@AllArgsConstructor
public class WriterCollection {
    private EnumMap<TypeOfResponse, ResponseWriter> writers;

    WriterCollection() {
        this.writers = new EnumMap<>(TypeOfResponse.class);

        this.writers.put(TypeOfResponse.TEXTUAL_RESPONSE, new TextualResponseWriter());
        this.writers.put(TypeOfResponse.BINARY_RESPONSE, new BinaryResponseWriter());
        this.writers.put(TypeOfResponse.EMPTY_RESPONSE, new EmptyResponseWriter());
    }

    public ResponseWriter getWriterFor(TypeOfResponse type) {
        if (type == null) {
            log.log(Level.ERROR, "Response type is null. Returning empty response writer");
            return this.writers.get(TypeOfResponse.EMPTY_RESPONSE);
        }

        ResponseWriter writer = this.writers.get(type);

        log.log(Level.INFO, "Sending back matching response writer  for {}", type.toString());
        return writer;
    }

}
