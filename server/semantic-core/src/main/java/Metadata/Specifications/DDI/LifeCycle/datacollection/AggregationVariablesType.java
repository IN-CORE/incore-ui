//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.datacollection;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.IdentifiableType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;


/**
 * Identifies the independent and dependent variables used in the aggregation process. Note that in the case of calculating a percentage, mean, etc. of a dependent value against the total population of the cell, there is no independent variable.
 * <p>
 * <p>Java class for AggregationVariablesType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="AggregationVariablesType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}IdentifiableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}IndependentVariableReference" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}DependentVariableReference" maxOccurs="unbounded"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AggregationVariablesType", propOrder = {
        "independentVariableReference",
        "dependentVariableReference"
})
public class AggregationVariablesType
        extends IdentifiableType {

    @XmlElement(name = "IndependentVariableReference")
    protected List<ReferenceType> independentVariableReference;
    @XmlElement(name = "DependentVariableReference", required = true)
    protected List<ReferenceType> dependentVariableReference;

    /**
     * A reference to a variable, which is an important constraint for the computed aggregation measure and has the potential to invoke a change in a dependent variable like sex for average of income. In the context of calculating percentages, the use of Sex as the independent variable would indicate that the percentages provided represent the percentage of the dependent variable associated with a specific value for Sex (i.e., the dependent variable expressed as a percentage of the total for Males). This would be opposed to the percent for the full population (the percent of the total grid population falling within that particular cell).Gets the value of the independentVariableReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the independentVariableReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getIndependentVariableReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReferenceType }
     */
    public List<ReferenceType> getIndependentVariableReference() {
        if (independentVariableReference == null) {
            independentVariableReference = new ArrayList<ReferenceType>();
        }
        return this.independentVariableReference;
    }

    /**
     * A reference to a variable, for which the aggregate measure is computed like average of income.Gets the value of the dependentVariableReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the dependentVariableReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDependentVariableReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReferenceType }
     */
    public List<ReferenceType> getDependentVariableReference() {
        if (dependentVariableReference == null) {
            dependentVariableReference = new ArrayList<ReferenceType>();
        }
        return this.dependentVariableReference;
    }

}