package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.ResponseType;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Component;

import java.util.EnumMap;

@Log4j2
@Component
@AllArgsConstructor
public class WriterCollection {
    private EnumMap<ResponseType, ResponseWriter> writers;

    WriterCollection() {
        this.writers = new EnumMap<>(ResponseType.class);

        this.writers.put(ResponseType.TEXTUAL_RESPONSE, new TextualResponseWriter());
        this.writers.put(ResponseType.BINARY_RESPONSE, new BinaryResponseWriter());
        this.writers.put(ResponseType.NULL_RESPONSE, new EmptyResponseWriter());
    }

    public ResponseWriter getWriterFor(ResponseType type) {
        if (type == null) {
            log.log(Level.ERROR, "Response type is null. Returning empty response writer");
            return this.writers.get(ResponseType.NULL_RESPONSE);
        }

        ResponseWriter writer = this.writers.get(type);

        log.log(Level.INFO, "Fetching response writer for {}", type.toString());
        if (writer == null) {
            log.log(Level.WARN, "Type {} does not have a matching response writer. Sending back default writer", type.toString());
            return this.writers.get(ResponseType.NULL_RESPONSE);
        }

        log.log(Level.INFO, "Sending back matching response writer");
        return writer;
    }

}
