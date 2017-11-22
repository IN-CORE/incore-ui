//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.studyunit;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

import Metadata.Specifications.DDI.LifeCycle.reusable.BudgetType;


/**
 * This object contains factory methods for each
 * Java content interface and Java element interface
 * generated in the ddi.studyunit package.
 * <p>An ObjectFactory allows you to programatically
 * construct new instances of the Java representation
 * for XML content. The Java representation of XML
 * content can consist of schema derived interfaces
 * and classes representing the binding of schema
 * type definitions, element declarations and models
 * groups.  Factory methods for each of these are
 * provided in this class.
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _StudyUnit_QNAME = new QName("ddi:studyunit:3_2", "StudyUnit");
    private final static QName _StudyBudget_QNAME = new QName("ddi:studyunit:3_2", "StudyBudget");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: ddi.studyunit
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link StudyUnitType }
     */
    public StudyUnitType createStudyUnitType() {
        return new StudyUnitType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StudyUnitType }{@code >}}
     */
    @XmlElementDecl(namespace = "ddi:studyunit:3_2", name = "StudyUnit")
    public JAXBElement<StudyUnitType> createStudyUnit(StudyUnitType value) {
        return new JAXBElement<StudyUnitType>(_StudyUnit_QNAME, StudyUnitType.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BudgetType }{@code >}}
     */
    @XmlElementDecl(namespace = "ddi:studyunit:3_2", name = "StudyBudget")
    public JAXBElement<BudgetType> createStudyBudget(BudgetType value) {
        return new JAXBElement<BudgetType>(_StudyBudget_QNAME, BudgetType.class, null, value);
    }

}
