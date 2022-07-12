package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.enums.ExpectedResponseType;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.manage.mimocks.service.helpers.MockParamBuilder;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class ListMocksServiceImpl implements ListMocksService {

    @Autowired
    private MocksRepository mocksRepository;

    @Autowired
    private EntityStatusService entityStatusService;

    @Autowired
    private MockParamBuilder mockParamBuilder;

    @Override
    public List<Mock> getAllMocks() {
        return mocksRepository.findAll();
    }

    @Override
    public Page<Mock> getMocksAsPageable(Pageable pageable, Status entityStatusParam,
                                         String httpMethodParam, String expectedResponseTypeParam) {
        HttpMethod httpMethod = null;
        EntityStatus entityStatus = null;
        ExpectedResponseType expectedResponseType = null;
        try{
            expectedResponseType = ExpectedResponseType.valueOf(expectedResponseTypeParam);
        }catch(Exception e){
            log.log(Level.DEBUG, e.getMessage());
        }
        if(ValidationUtil.isArgNotNull(httpMethodParam)){
            httpMethod = mockParamBuilder.findHttpMethodFromQueryString(httpMethodParam);
        }
        if (ValidationUtil.isArgNotNull(entityStatusParam)) {
            entityStatus = entityStatusService.findByEntityStatus(entityStatusParam.name());
        }

        if(ValidationUtil.isArgNotNull(httpMethod)
                && ValidationUtil.isArgNotNull(entityStatus)
                && ValidationUtil.isArgNotNull(expectedResponseType)){
            switch (expectedResponseType){
                case TEXTUAL_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndHttpMethodAndTextualResponseIsNotNull(entityStatus,
                            httpMethod, pageable);
                case BINARY_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndHttpMethodAndBinaryResponseIsNotNull(entityStatus,
                            httpMethod, pageable);
                case EMPTY_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndHttpMethodAndTextualResponseIsNullAndBinaryResponseIsNull(
                            entityStatus, httpMethod, pageable);
            }
        }

        if(ValidationUtil.isArgNotNull(httpMethod)
                && ValidationUtil.isArgNotNull(entityStatus)){
            return mocksRepository.findAllByEntityStatusAndHttpMethod(entityStatus, httpMethod, pageable);
        }

        if(ValidationUtil.isArgNotNull(entityStatus) && ValidationUtil.isArgNotNull(expectedResponseType)){
            switch (expectedResponseType){
                case TEXTUAL_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndTextualResponseIsNotNull(entityStatus, pageable);
                case BINARY_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndBinaryResponseIsNotNull(entityStatus, pageable);
                case EMPTY_RESPONSE:
                    return mocksRepository.findAllByEntityStatusAndTextualResponseIsNullAndBinaryResponseIsNull(entityStatus, pageable);
            }
        }

        if(ValidationUtil.isArgNotNull(httpMethod) && ValidationUtil.isArgNotNull(expectedResponseType)){
            switch (expectedResponseType){
                case TEXTUAL_RESPONSE:
                    return mocksRepository.findAllByHttpMethodAndTextualResponseIsNotNull(httpMethod, pageable);
                case BINARY_RESPONSE:
                    return mocksRepository.findAllByHttpMethodAndBinaryResponseIsNotNull(httpMethod, pageable);
                case EMPTY_RESPONSE:
                    return mocksRepository.findAllByHttpMethodAndTextualResponseIsNullAndBinaryResponseIsNull(httpMethod, pageable);
            }
        }

        if(ValidationUtil.isArgNotNull(httpMethod)){
            return mocksRepository.findAllByHttpMethod(httpMethod, pageable);
        }
        if (ValidationUtil.isArgNotNull(entityStatus)) {
            return mocksRepository.findAllByEntityStatus(entityStatus, pageable);
        }
        if(ValidationUtil.isArgNotNull(expectedResponseType)
                && expectedResponseType == ExpectedResponseType.TEXTUAL_RESPONSE){
            return mocksRepository.findAllByTextualResponseIsNotNull(pageable);
        }
        if(ValidationUtil.isArgNotNull(expectedResponseType)
                && expectedResponseType == ExpectedResponseType.BINARY_RESPONSE){
            return mocksRepository.findAllByBinaryResponseIsNotNull(pageable);
        }
        if(ValidationUtil.isArgNotNull(expectedResponseType)
                && expectedResponseType == ExpectedResponseType.EMPTY_RESPONSE){
            return mocksRepository.findAllByTextualResponseIsNullAndBinaryResponseIsNull(pageable);
        }
        return mocksRepository.findAll(pageable);
    }
}
