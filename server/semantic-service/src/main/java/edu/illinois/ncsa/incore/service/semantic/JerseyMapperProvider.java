
package edu.illinois.ncsa.incore.service.semantic;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import edu.illinois.ncsa.incore.semantic.units.io.serializer.json.JsonUnitSerializer;
import edu.illinois.ncsa.incore.semantic.units.model.Unit;

import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Provider
public class JerseyMapperProvider implements ContextResolver<ObjectMapper> {
    private static ObjectMapper mapper = new ObjectMapper();

    @Override
    public ObjectMapper getContext(Class<?> type)
    {
        SimpleModule module = new SimpleModule();
        module.addSerializer(Unit.class, new JsonUnitSerializer());
        mapper.registerModule(module);

        return mapper;
    }
}